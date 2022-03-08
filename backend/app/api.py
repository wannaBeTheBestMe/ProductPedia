from fastapi import FastAPI, Request
from starlette.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from requests_html import AsyncHTMLSession
import time

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to this list"}


def filter_non_digits(string: str) -> str:
    result = ''
    for char in string:
        if char in '1234567890.':
            result += char
    if result[-1] == ".":
        return result[:-1]
    return result


@app.get("/info", tags=["product"])
async def get_product_info(request: Request) -> list:
    params = request.query_params
    urls = list(params.values())

    products = []
    for url in urls:
        beginning = time.perf_counter()

        session = AsyncHTMLSession()
        request = await session.get(url)
        await request.html.arender()

        product = {}

        product["title"] = request.html.xpath(
            '//*[@id="productTitle"]', first=True).text

        product["url"] = url

        global_rating_selector = "a[role='button'].a-popover-trigger > i.a-icon.a-icon-star > span.a-icon-alt"
        global_rating_split_by_word = request.html.find(
            global_rating_selector, first=True).text.split(" ")
        product["globalRating"] = f"{global_rating_split_by_word[0]}/{global_rating_split_by_word[3]}"

        thumbnail_images_selector = "ul.regularAltImageViewLayout > li.item img"
        product["thumbnailImages"] = [thumbnail.attrs["src"]
                                      for thumbnail in request.html.find(thumbnail_images_selector)]

        # large_images_selector = "img.a-dynamic-image.a-stretch-horizontal, img.a-dynamic-image.a-stretch-vertical"
        # TODO: Selector only selects 1 large image, should select more
        large_images_selector = ".a-stretch-horizontal, .a-stretch-vertical"
        product["largeImages"] = [image.attrs["src"]
                                  for image in request.html.find(large_images_selector)]

        try:
            product["price"] = filter_non_digits(request.html.xpath(
                '//*[@id="corePrice_desktop"]/div/table/tbody/tr[2]/td[2]/span[1]/span[2]', first=True).text)
        except:
            product["price"] = filter_non_digits(request.html.xpath(
                '//*[@id="corePriceDisplay_desktop_feature_div"]/div[1]/span[2]/span[2]/span[2]', first=True).text)

        about_this_item_selector = "ul.a-unordered-list.a-vertical.a-spacing-mini > li > span"
        product["aboutThisItem"] = [
            bullet_point.text for bullet_point in request.html.find(about_this_item_selector)]

        technical_details_selector = ".a-row > div table[role='presentation'].prodDetTable > tbody > tr"
        technical_details_keys = [technical_detail_key.text.replace(
            " ", "") for technical_detail_key in request.html.find(technical_details_selector + " > th")]
        technical_details_values = [technical_detail_value.text for technical_detail_value in request.html.find(
            technical_details_selector + " > td")]
        technical_details = {k: v for (k, v) in zip(
            technical_details_keys, technical_details_values) if not k == "CustomerReviews"}
        if bool(technical_details) == False:
            alt_technical_details_selector = ".a-row > div.a-span6 table.a-bordered > tbody > tr > td > p"
            alt_technical_details = [alt_technical_detail.text for alt_technical_detail in request.html.find(
                alt_technical_details_selector)]
            alt_technical_details_keys = [alt_technical_detail_key.replace(
                " ", "") for alt_technical_detail_key in alt_technical_details if alt_technical_details.index(alt_technical_detail_key) % 2 == 0]
            alt_technical_details_values = [alt_technical_detail_value for alt_technical_detail_value in alt_technical_details if not alt_technical_details.index(
                alt_technical_detail_value) % 2 == 0]
            technical_details = {alt_k: alt_v for (alt_k, alt_v) in zip(
                alt_technical_details_keys, alt_technical_details_values) if not alt_k == "CustomerReviews"}
        product["technicalDetails"] = technical_details

        end = time.perf_counter()
        product["time"] = str(end - beginning)

        products.append(product)

    return {"data": products}


# @app.get("/departments", tags=["product"])
# async def get_department_info():
#     session = AsyncHTMLSession()
#     request = await session.get("https://www.amazon.in/Amazon-Brand-Vedaka-Flour-Besan/dp/B07F1TL383?pd_rd_w=z3ZTD&pf_rd_p=e214524e-b3bf-4a7d-a6e7-1c972f7f3d37&pf_rd_r=TX39TYJSK4D1YPMRS9E5&pd_rd_r=facfa86f-0b56-4a73-bfc1-ea70901545f7&pd_rd_wg=262VD&pd_rd_i=B07F1TL383&fpw=alm&almBrandId=ctnow&ref_=pd_alm_fs_dsk_sf_rtd_1_1_i")
#     await request.html.arender()
#
#     departments = {}
#
#     # departments_menu_selector = "#hmenu-content > ul > li > a"
#     # departments["all"] = request.html.find(departments_menu_selector).text
#     departments["all"] = request.html.xpath('//*[@id="productTitle"]', first=True).text
#
#     return {"data": departments}
