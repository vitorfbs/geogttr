import spacy

def identify_locations(text: str):
  nlp = spacy.load('en_core_web_sm')
  doc = nlp(text)

  return [ent.text for ent in doc.ents if ent.label_ == "GPE"]