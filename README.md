[![Maintainability](https://api.codeclimate.com/v1/badges/350ec06eba528e4300f6/maintainability)](https://codeclimate.com/github/parkers12/otus-homework-5/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/350ec06eba528e4300f6/test_coverage)](https://codeclimate.com/github/parkers12/otus-homework-5/test_coverage)

# Погода в вашем городе

## Структура приложения

- .github
  - workflows
    - deploy.yml
    - sanity-check.yml
- .husky
  - \_
    - .gitignore
    - husky.sh
  - .gitignore
  - pre-commit
- src
  - img
    - search.svg
  - js
    - functions.js
    - functions.test.js
    - getCurrentLocation.js
    - getCurrentLocation.test.js
    - markup.js
    - markup.test.js
  - styles
    - reset.css
    - styles.css
  - favicon.ico
  - index.js
- .eslintrc.js
- .gitignore
- .prettierignore
- .prettierrc.json
- .babel.config.js
- index.html
- jest.config.js
- package-lock.json
- package.json
- README.md
- webpack.config.js

## Описание приложения

Приложение отображает текущую погоду и местоположение пользователя на основе его геоданных. Так же пользователь может узнать погоду в любом другом городе, указав его название в поле поиска. Последние 10 запрошенных пользователем городов сохраняются в истории и отображаются на странице приложения. Пользователь может посмотреть погоду в сохраненных городах кликнув по их названию.

## Техническое описание работы приложения

Приложение содержит стартовую страницу index.html. В ней содержится минимальная, необходимая html-разметка, а так же ссылки: на стартовый файл скрипта index.js и ссылку на сервис Гугла, который необходим для отображения положения пользователя на карте. При запуске приложения из файла index.js запускается функция startFunction, которая с помощью функции markup и файла markup.js добавляет на страницу index.html остальную html-разметку, необходимую для работы приложения. Далее запускается функция getCurrentLocation, которая располагается в файле functions.js. Файл index.js так же содержит два блока кода, которые запускают функцию handleClick по клику по иконке или по нажатию кнопки "Enter" на клавиатуре.

Функция getCurrentLocation получает данные в формате json о местоположении пользователя с помощью сервиса https://api.sypexgeo.net/. После получения данных функция getCurrentLocation запускает поочередно еще две функции - getWeather и getLocalStorage. Первая - получает погоду, а вторая - историю запросов пользователя.
Функция getWeather с помощью вспомогательной функции getData формирует запрос, включающий введенный пользователем город. После того как ответ от сервера получен, функция его обрабатывает и на основе данных, формируется html-код содержащий показатели погоды. Так как некоторые данные, полученные от погодного сервера, поступают в формате неудобном (погода в кельвинах, время в миллисекундах) для зрительного восприятия, то в ходе работы функции getWeather подключаются еще несколько функций, а именно:

- getDirectionWind - функция для конвертирования градусов в направление ветра;
- getPressure - функция для перевода давления из гектопаскалей в миллиметры ртутного столба;
- getSign - функция для добавления знака "+", если значение температуры положительное;
- timeTranslater - функция для перевода времени из миллисекунд в формат - чч:мм;
- dateConvert - функция для конвертирования значения после запятой десятичного числа в минуты;
- getTimeStamp - функция, которая вычисляет метку времени начала текущего дня;
- dataViewer - функция для отобажения блока html-кода, когда он заполнен необходимой информацией и готов к показу.

Функция getMap одна из основных в работе приложения, она принимает координаты местоположения пользователя и показывает его на карте Гугл.

Функция getLocalStorage получает историю запросов пользователя и если она имеется, то с помощью функции getTemperature выводит список из 10 последних городов, просмотренных пользователем. Функция getLocalStorage так же содержит функцию getClicker, которая отслеживает клик пользователя и передает выбранный город в функцию getWeather.

Функция handleClick обрабатывает введенный пользователем город. С помощью регулярного выражения выполняется проверка языка, на котором введен город. Так как приложение работает на английском языке, функция handleClick при некорректно введеных значениях будет запускать функцию wrongCity, которая принимает флаг и в данном случае будет блокировать работу приложения и выводить соответствующие сообщения в поле карты и блоке с погодой. При корректно введенных данных запускается функция getMapCity, которая с помощью сервиса Гугл проверяет существование введенного пользователем города. В случае, если город не найден, запускается функция wrongCity, если город существует, то поочередно запускаются функции - getWeather, wrongCity (с флагом для отображения карты и погоды), saveCity.

Функция saveCity сохраняет введенный пользователем город в истории, которая хранится в LocalStorage браузера пользователя. Так как хранение информации в LocalStorage возможно только в виде строки, а городов может быть до 10, то функция saveCity сохраняет список городов в виде массива.

Большая часть функций покрыта тестами с помощью Jest.

# Weather in your city

## App Description

The application displays the current weather and location of the user based on his geodata. The user can also find out the weather in any other city by entering its name in the search field. The last 10 cities requested by the user are saved in history and displayed on the application page. The user can see the weather in the saved cities by clicking on their name.

## Technical description of the application

The application contains the start page index.html. It contains the minimum required html markup, as well as links: to the start script file index.js and a link to the Google service, which is required to display the user's position on the map. When the application is launched from the index.js file, the startFunction is launched, which, using the markup function and the markup.js file, adds the rest of the html markup necessary for the application to work on the index.html page. Next, the getCurrentLocation function is launched, which is located in the functions.js file. The index.js file also contains two blocks of code that trigger the handleClick function by clicking on the icon or by pressing the "Enter" key on the keyboard.

The getCurrentLocation function receives data in json format about the user's location using the https://api.sypexgeo.net/ service. After receiving the data, the getCurrentLocation function runs in turn two more functions - getWeather and getLocalStorage. The first gets the weather, and the second gets the user's request history.
The getWeather function uses the getData helper function to form a request that includes the user-entered city. After the response from the server is received, the function processes it and based on the data, an html-code containing weather indicators is formed. Since some data received from the weather server comes in a format that is inconvenient (weather in Kelvin, time in milliseconds) for visual perception, several more functions are connected during the work of the getWeather function, namely:

- getDirectionWind - function for converting degrees to wind direction;
- getPressure - a function for converting pressure from hectopascals to millimeters of mercury;
- getSign - a function for adding a "+" sign if the temperature value is positive;
- timeTranslater - a function for converting time from milliseconds to the format - hh: mm;
- dateConvert - a function for converting the value after the decimal point into minutes;
- getTimeStamp - a function that calculates the timestamp of the beginning of the current day;
- dataViewer - a function for displaying a block of html-code when it is filled with the necessary information and is ready for display.

The getMap function is one of the main functions of the application, it takes the coordinates of the user's location and displays it on the Google map.

The getLocalStorage function gets the user's request history and, if it exists, using the getTemperature function, it displays a list of the last 10 cities viewed by the user. The getLocalStorage function also contains a getClicker function that tracks the user's click and passes the selected city to the getWeather function.

The handleClick function processes the user-entered city. The regular expression checks the language in which the city is entered. Since the application works in English, the handleClick function, with incorrectly entered values, will launch the wrongCity function, which accepts a flag and in this case will block the application and display the appropriate messages in the map field and the weather block. If the data is entered correctly, the getMapCity function is launched, which, using the Google service, checks the existence of the city entered by the user. If the city is not found, the wrongCity function is launched, if the city exists, then the functions getWeather, wrongCity (with a flag for displaying the map and weather), saveCity are launched one by one.

The saveCity function saves the user-entered city in history, which is stored in the LocalStorage of the user's browser. Since information can be stored in LocalStorage only as a string, and there can be up to 10 cities, the saveCity function saves the list of cities as an array.

Most of the functionality is covered in tests using Jest.
