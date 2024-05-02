
/*
  
  Rajador Developer

  ▒█▀▀█ ░█▀▀█ ░░░▒█ ░█▀▀█ ▒█▀▀▄ ▒█▀▀▀█ ▒█▀▀█ 
  ▒█▄▄▀ ▒█▄▄█ ░▄░▒█ ▒█▄▄█ ▒█░▒█ ▒█░░▒█ ▒█▄▄▀ 
  ▒█░▒█ ▒█░▒█ ▒█▄▄█ ▒█░▒█ ▒█▄▄▀ ▒█▄▄▄█ ▒█░▒█

  GitHub: https://github.com/RajadorDev

  Discord: rajadortv


*/

const randomRGBColors = false

var oldColor = null

var block = null

var maxX = 0 

var maxY = 0 

var minX = 0 

var minY = 0

var byUpdate = 1

const SPEED = 2.5

const DIMENSION_X = 0

const DIMENSION_Y = 1

const DIMENSION_DOWN = [DIMENSION_X, DIMENSION_Y]

const DIMENSION_UP = [DIMENSION_X, DIMENSION_Y]

var max_dimensions_data = {}

const PALLET = 
[
	'rgb(56,109,211)',
	'rgb(71,198,55)',
	'rgb(59,155,174)',
	'rgb(203,36,36)',
	'rgb(236,233,17)',
	'rgb(233,17,236)',
	'rgb(236,17,107)',
	'rgb(173,17,236)',
	'rgb(236,146,17)'
];

function onLoad() 
{
	block = document.querySelector('.rgb')
	animate()
}

function changeColor() 
{
	if (block)
	{
		let color = 'rgb(236,146,17)'
		if (randomRGBColors)
		{
			while ((color = generateRGB()) == oldColor);
		} else {
			while ((color = PALLET[Math.floor(Math.random() * (PALLET.length - 1))]) == oldColor);
		}
		oldColor = color
		document.querySelector('.dvd').style.backgroundColor = color 
		document.querySelector('.text').style.color = color
	}
}

function clearPx(value, toNumber = true)
{
	value = value.replace('px', '')
	if (toNumber)
	{
		return Number(value)
	}
	return value
}

function toPx(str) 
{
	str = String(str) + 'px'
	return str
}

function generateRGB() 
{
	const RGB = [] 
	for (let i = 1; i <= 3; i++)
	{
		RGB.push(randomRgbValue())
	}
	return 'rgb(' + RGB.join(', ') + ')'
}


function animate() 
{
	updateDimensions()
	if (block)
	{
		for (let dimension of [DIMENSION_X, DIMENSION_Y])
		{
			const max = max_dimensions_data[dimension]
			const value = clearPx(getDimensionValue(dimension))
			const blockWidth = clearPx(getWidthOf(dimension))
			const dimensionIndex = dimension === DIMENSION_X ? 'left' : 'bottom'
			if ((value + blockWidth) >= max)
			{
				changeColor()
				if (DIMENSION_UP.includes(dimension))
				{
					delete DIMENSION_UP[DIMENSION_UP.indexOf(dimension)]
				} 
				if (!DIMENSION_DOWN.includes(dimension)) 
				{
					DIMENSION_DOWN.push(dimension)
				}
			} else if (value <= 0) 
			{
				changeColor()
				if (DIMENSION_DOWN.includes(dimension))
				{
					delete DIMENSION_DOWN[DIMENSION_DOWN.indexOf(dimension)]
				} 
				if (!DIMENSION_UP.includes(dimension)) 
				{
					DIMENSION_UP.push(dimension)
				}
			}
			
			if (DIMENSION_DOWN.includes(dimension))
			{
				block.style[dimensionIndex] = toPx(value - (byUpdate * SPEED))
			} else if (DIMENSION_UP.includes(dimension))
			{
				block.style[dimensionIndex] = toPx(value + (byUpdate * SPEED))
			} else {
				console.error('Dimension without direction ', dimension)
			}
			
		}
	}
	window.requestAnimationFrame(animate)
}

function randomRgbValue() 
{
	return Math.floor(Math.random() * 255);
}

function getDimensionValue(dimension) 
{
	if (dimension === DIMENSION_X)
	{
		return block.style.left
	} else if (dimension === DIMENSION_Y) {
		return block.style.bottom
	} else {
		console.error('Invalid dimension', dimension)
	}
}

function getWidthOf(dimension) 
{
	dimension = dimension === DIMENSION_X ? 'width' : 'height'
	return window.getComputedStyle(block)[dimension]
}

function updateDimensions() 
{
	maxX = document.body.offsetWidth
	
	maxY = document.body.offsetHeight
	
	max_dimensions_data = {
		[DIMENSION_X]: maxX,
		[DIMENSION_Y]: maxY
	}
}
