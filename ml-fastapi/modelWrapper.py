

class ModelWrapper:
    def __init__(self, model):
        self.model = model

    def predict(self, des, inf):
        pred = self.model(des, inf)
        pred = {key: value.numpy().tolist() for key, value in pred.items()}
        return pred

    def __call__(self, des, inf):
        return self.predict(des, inf)
