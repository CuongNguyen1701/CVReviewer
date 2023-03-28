import uvicorn
from fastapi import FastAPI,Form,Query
from modelwrapper import *
from typing import Annotated
import tensorflow as tf
import tensorflow_text as tft
from typing import List
from pydantic import BaseModel

app = FastAPI()

preModel=tf.saved_model.load('/Users/hoangnam/Downloads/model/evaluator2')

@app.get("/")
def hello():
    """ Main page of the app. """
    return "Hello World!"
class Item(BaseModel):
    des: str
    inf: List[str]

@app.post("/predict")
async def predict(item:Item):
    """ Return JSON serializable output from the model """
    classifier = ModelWrapper(preModel)
    return classifier.predict(item.des,item.inf)
      
    
if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8080)
