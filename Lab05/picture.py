from colors import *

class Picture:
  def __init__(self, imagen):
    self.imagen = imagen

  def __eq__(self, otro):
    return self.imagen == otro.imagen

  def _invColor(self, rgb):
    if rgb not in inverter:
      return rgb
    return inverter[rgb]

  def verticalMirror(self):
    arriba = []
    for value in self.imagen:
      arriba.append(value[::-1])
    return Picture(arriba)