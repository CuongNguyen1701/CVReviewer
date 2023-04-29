import fitz
import re
from googletrans import Translator
translator = Translator()


def extractContent(link):
    # open Pdfs and get content
    doc = fitz.open(link)
    fileText = ""
    for page in doc:
        text = page.get_text()
        fileText = fileText+' '+text
    # extract email
    email = re.search(r'\S+@\S+', fileText).group()
    # extract phone
    try:
        phone = re.search(
            r'0\d{9}|(\+\d{1,2}\s)?\d{3}\s?\d{3}\s?\d{3}', fileText
        )
        assert not phone is None and phone != ''
        phone = phone.group()
    except AssertionError:
        phone = ""

    # make text prettier by removing all special character except dot
    fileText = re.sub(r'[^\w\s.]+', '', fileText)

    # if it is vietnamese, translate it to english
    if translator.detect(fileText).lang == 'vi':
        fileText = translator.translate(text, src='vi', dest='en').text

    # format text to normal text for more exactly result
    fileText = fileText.lower()
    fileText = re.sub(r'\b\w\s', ' ', fileText)
    fileText = re.sub(r'\s+', ' ', fileText)

    result = [email, phone, fileText]
    return result
