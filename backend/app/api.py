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
        if char in '1234567890':
            result += char
    return result


@app.get("/price", tags=["product"])
async def get_price(request: Request) -> list:
    params = request.query_params
    urls = list(params.values())

    products = []
    for url in urls:
        beginning = time.time()

        session = AsyncHTMLSession()
        request = await session.get(url)
        await request.html.arender()

        product = {}
        product["title"] = request.html.xpath(
            '//*[@id="productTitle"]', first=True).text
        product["url"] = url
        try:
            product["price"] = filter_non_digits(request.html.xpath(
                '//*[@id="corePrice_desktop"]/div/table/tbody/tr[2]/td[2]/span[1]/span[2]', first=True).text)
        except:
            product["price"] = filter_non_digits(request.html.xpath(
                '//*[@id="corePriceDisplay_desktop_feature_div"]/div[1]/span[2]/span[2]/span[2]', first=True).text)

        end = time.time()
        product["time"] = str(end - beginning)

        products.append(product)

    return {"data": products}
