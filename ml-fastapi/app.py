import uvicorn
from fastapi import FastAPI
from modelWrapper import *
from typing import Annotated
import tensorflow as tf
import tensorflow_text as tft
from typing import List
from pydantic import BaseModel
from extractContent import *
app = FastAPI()
preModel = tf.saved_model.load('/Users/hoangnam/Downloads/super_super_model')


@app.get("/")
def hello():
    """ Main page of the app. """
    return "Hello World!"


class Item(BaseModel):
    des: str
    inf: List[str]


@app.post("/predict")
async def predict(item: Item):
    """ Return JSON serializable output from the model """
    classifier = ModelWrapper(preModel)
    return classifier.predict(translator.translate(item.des, dest="en").text, item.inf)


class Link(BaseModel):
    path: str


@app.post("/api/loadPdf")
async def loadPdf(link: Link):
    return extractContent(link.path)

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8080)
