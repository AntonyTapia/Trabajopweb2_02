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
    for valor in self.imagen:
      arriba.append(valor[::-1])
    return Picture(arriba)

  def negative(self):
    Otraimagen = []
    for valor in self.img:
      row = []
      for char in valor:
        row.append(self._invColor(char))
      Otraimagen.append(row)    
    return Picture(Otraimagen)

  def join(self, p):
    Otraimagen = []
    for variable, valor in enumerate(self.img):
      Otraimagen.append(list(valor) + list(p.img[variable]))
    return Picture(Otraimagen)

  def up(self, p):
    Otraimagen = []
    for valor in p.img:
      Otraimagen.append(valor[::1])
    for valor in self.img:
      Otraimagen.append(valor[::1])
    return Picture(Otraimagen)
    
  def under(self, p):
    Otraimagen = []
    for valor in self.img:
        Otraimagen.append(list(valor))
    for i, valor in enumerate(p.img):
      for j, char in enumerate(valor):
        if(Otraimagen[i][j] == ' '):
          Otraimagen[i][j] = char
    return Picture(Otraimagen)