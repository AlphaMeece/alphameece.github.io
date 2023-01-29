import os

folders = os.listdir('./')
tags = ''

for folder in folders:
    if os.path.isfile('./{}'.format(folder)):
        continue
    images = os.listdir('./{}'.format(folder))
    for image in images:
        tags = tags + '<image src="./{}/{}">\n'.format(folder, image)

print(tags)
