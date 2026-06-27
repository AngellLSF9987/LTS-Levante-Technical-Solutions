from .config import *
from .utils import load
class Compiler:
    def compile(self):
        html=load(TEMPLATE)
        for key,f in PARTS.items():
            html=html.replace("{{"+key+"}}",load(PARTIALS/f))
        return html
