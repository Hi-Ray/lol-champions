# lol-champions

A small nodejs application which generates multiple files which contain champions ids and their respective ids for each locale,
2 folders will be generated `champions` and `ids` which contains files such as `champions-en_gb.json` for the champions folder
and `ids-en_gb.json` for the ids folder, the champions folder will have champion names as keys and the champion ids as values and vice versa for the id files.


An example for the `champions-en_gb.json` file would be:

```json
{
  "1":"Annie",
  "2":"Olaf",
  "3":"Galio",
  "4":"TwistedFate"
}
```
and an example for the `ids-en_gb.json` file would be:

```json
{
    "Annie":1,
    "Olaf":2,
    "Galio":3,
    "Twisted Fate":4
}
```

This small app pulls data from [Community Dragon](https://www.communitydragon.org/) for information such as the champions for the current patch, so every time it is ran it generates new files or replaces the old one with more up to date ones.

Both the champions and ids folders and file names can be configured by the user on lines 38 to 41 in [champions.js](./src/champions.js)

## Run

To run this app you need [nodejs](https://nodejs.org/en/).

First clone this repo with: 

```git
git clone https://github.com/RayZz-/lol-champions.git
```
then navigate to the directory then run:
```shell script
NPM start
```
from the directory