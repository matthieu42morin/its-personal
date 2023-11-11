---
title: First post
excerpt: First post
date: 2021-01-01
tags:
    - first
    - post
published: true
image: Feature.jpg
---

## Svelte

Media inside the **Svelte** folder is served from the `static` folder.

```python

input_text = '''        "yahooapis.com",
        "hotmail.com",
        "gfx.ms",
        "afx.ms",
        "live.com",
'''
# and so on...

lines = input_text.split('\n')

formatted_lines = ['* ' + line.strip()[1:-2] + ' * block'  for line in lines if line]

output_text = '\n'.join(formatted_lines)
print(output_text)

```
