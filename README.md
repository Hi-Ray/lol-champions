# lol-champions

A small nodejs application which generates 2 files `ids.json` and `champions.json` (names configurable in the code) both which simply contain the champions matching their ids and vice versa.

An example for the `champions.json` file would be:

```json
{
  "1":"Annie",
  "2":"Olaf",
  "3":"Galio",
  "4":"TwistedFate"
}
```

and the `ids.json` would be similar however they keys and values would be swapped.

This small app pulls data from [datadragon](https://developer.riotgames.com/ddragon.html) for information such as the current patch and the champions for the current patch, so every time it is ran it generates new files or replaces the old one with more up to date ones.

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