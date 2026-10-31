import json
b=json.load(open('audit.json',encoding='utf-8-sig'))
for k,v in b.get('vulnerabilities',{}).items():print(k,v['severity'],v.get('fixAvailable'))

