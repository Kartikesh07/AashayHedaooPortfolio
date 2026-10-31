import json,re
from pathlib import Path
from html.parser import HTMLParser
class Text(HTMLParser):
 def __init__(self):super().__init__();self.parts=[];self.ignore=0;self.links=[]
 def handle_starttag(self,t,a):
  if t in ['script','style']:self.ignore+=1
  if t=='a':self.links.extend(v for k,v in a if k=='href')
 def handle_endtag(self,t):
  if t in ['script','style']:self.ignore-=1
 def handle_data(self,s):
  if not self.ignore:self.parts.append(s)
def norm(s):return re.sub(r'\s+',' ',s).strip()
parsed=[]
for f in Path('out').rglob('*.html'):
 p=Text();p.feed(f.read_text(encoding='utf8'));parsed.append(p)
text=' '.join(norm(' '.join(p.parts)) for p in parsed)
links={x for p in parsed for x in p.links}
s=json.load(open('src/data/source.json',encoding='utf8'))
missing=[]
for section in s:
 for t in section['texts']:
  if norm(t) not in text:missing.append((section['index'],t[:100]))
print('Missing original text:',missing)
print('Missing original links:',[(x['index'],l) for x in s for l in x['links'] if l not in links and l.replace('&','&amp;') not in links])
print('HTML routes',len(parsed),'Original sections',len(s))
missing_links=[l for x in s for l in x['links'] if l not in links and l.replace('&','&amp;') not in links]
assert parsed, 'Build the portfolio before running the content audit.'
assert not missing and not missing_links, 'Original content or links are missing from the build.'
