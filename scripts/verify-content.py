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
for f in [Path('.next/server/app/index.html')]:
 if not f.exists():continue
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
html=Path('.next/server/app/index.html').read_text(encoding='utf8')
assert html.count('class="case-study"') == 7, 'All seven case studies must exist on the home page.'
assert not any(l.startswith('/about') or l.startswith('/contact') or l.startswith('/projects') for l in links), 'Internal navigation must stay on the home page.'
assets=json.loads(Path('src/data/assets.json').read_text(encoding='utf8'))
missing_media=[]
for asset in assets.values():
 for key in ['src','poster']:
  path=asset.get(key)
  if path and not (Path('public') / path.lstrip('/')).is_file():missing_media.append(path)
assert not missing_media, f'Original media missing: {missing_media}'
documents=list(Path('public/documents').glob('*.docx'))
assert len(documents) == 3 and all('/documents/'+p.name in links for p in documents), 'All three local design documents must be linked.'
print('PASS: all original text and links on /; seven projects; original media present; three local documents linked.')

# Resolve every original media reference, including logo/contact assets.
unknown_refs=[(section['index'],ref) for section in s for ref in section['refs'] if ref not in assets]
assert not unknown_refs, f'Original media references lost: {unknown_refs}'
expected_slugs=['krishna-stories','detective-iq-3','detective-iq-2','detective-iq','pizza-iq','wobble-bomber','dreamlink']
assert all(f'id="project-{slug}"' in html for slug in expected_slugs), 'Original project anchors are missing.'
assert all(f'id="{section}"' in html for section in ['home','work','process','about','contact']), 'Single-page sections are missing.'
print('PASS: original asset references resolve; all seven project anchors and five sections exist.')
