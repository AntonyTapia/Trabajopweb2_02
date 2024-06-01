from chessPictures import *
from interpreter import draw
from picture import Picture
from colors import *

#Ejercicio a

tab = knight
tab = Picture.join(tab, Picture.negative(knight))
tab = Picture.up(Picture.negative(tab), tab)
draw(tab)


#Ejercicio b

tab = knight
tab = Picture.join(tab, Picture.negative(knight))
tab = Picture.up(Picture.verticalMirror(tab), tab)
draw(tab)


#Ejercicio c

tab = queen
tab = Picture.horizontalRepeat(queen, 4)
draw(tab)


#Ejercicio d

tab = square
tab = Picture.join(tab, Picture.negative(square))
tab = Picture.horizontalRepeat(tab, 4)
draw(tab)


#Ejercicio e

tab = square
tab = Picture.join(tab, Picture.negative(square))
tab = Picture.negative(Picture.horizontalRepeat(tab, 4))
draw(tab)


#Ejercicio f

tab1 = square
tab1 = Picture.join(tab1, Picture.negative(square))
tab1 = (Picture.horizontalRepeat(tab1, 4))
tab2 = Picture.negative(tab1)
tab3 = Picture.verticalRepeat(Picture.up(tab2, tab1), 2)
draw(tab3)


#Ejercicio g

filaInit = Picture.under(rock, Picture.negative(square))

filaInit = Picture.join(filaInit, Picture.under(knight, square))
filaInit = Picture.join(filaInit, Picture.under(bishop, Picture.negative(square)))
filaInit = Picture.join(filaInit, Picture.under(queen, square))
filaInit = Picture.join(filaInit, Picture.under(king, Picture.negative(square)))
filaInit = Picture.join(filaInit, Picture.under(bishop, square))
filaInit = Picture.join(filaInit, Picture.under(knight, Picture.negative(square)))
filaInit = Picture.join(filaInit, Picture.under(rock, square))

filaNegro = Picture.negative(filaInit)

filaPeon = Picture.under(pawn, square)
filaPeon = Picture.join(filaPeon, Picture.under(pawn, Picture.negative(square)))
filaPeon = Picture.horizontalRepeat(filaPeon, 4)

tab1 = square
tab1 = Picture.join(tab1, Picture.negative(square))
tab1 = (Picture.horizontalRepeat(tab1, 4))
tab2 = Picture.negative(tab1)
tab3 = Picture.verticalRepeat(Picture.up(tab2, tab1), 2)

tablero = Picture.up(Picture.negative(filaPeon), filaNegro)
tablero = Picture.up(tab3, tablero)
tablero = Picture.up(filaPeon, tablero)
tablero = Picture.up(filaInit, tablero)

draw(tablero)