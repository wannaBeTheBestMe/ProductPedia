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

        end = time.perf_counter()
        product["time"] = str(end - beginning)

        products.append(product)

    return {"data": products}
