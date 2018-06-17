# General Overview
This is the application development repository for the BarUp project. Mainly developed by @CarlosBM99 (Carlos Bertomeu) and @MrAceitun0 (Sergi Olives).
The repository also contains most of the server work developed by @RampantCereal (Eric Estévez) and @oscarsp9 (Óscar Subirats).

A quick reminder that this repository has been the main development environment for the mobile and server and eventually, when all the work has been finished, it has been pushed to the bitbucket project repository where the app just needed a bit of polishing.

**Disclaimer:** Since the server available is not that powerful and for the demo we try to give a good user experience for the people that are trying out the app, the database displayed for the app has 100 bars to make the processes faster.

## **Tools** ##
The app will be developed using [React Native](https://facebook.github.io/react-native/) as the programming language. Using react native will let us develop at the same time for iOS and Android have the same core for both. Both versions will have minimal differences without affecting the nucleus of the app. 

Used libraries:

* [react](https://reactjs.org/)
* [react-native](https://facebook.github.io/react-native/)
* [react-native-elements](https://github.com/react-native-training/react-native-elements)
* [react-native-material-dropdown](https://github.com/n4kz/react-native-material-dropdown)
* [native-base](https://nativebase.io/)
* [react-navigation](https://reactnavigation.org/)
* [react-native-segmented-control-tab](https://github.com/kirankalyan5/react-native-segmented-control-tab)
* [react-native-google-places-autocomplete](https://github.com/FaridSafi/react-native-google-places-autocomplete)
* [react-native-geocoding](https://github.com/marlove/react-native-geocoding)
* [react-native-responsive-fontsize](https://www.npmjs.com/package/react-native-responsive-fontsize)
* [react-native-maps](https://github.com/react-community/react-native-maps)
* [react-native-responsive-fontsize](https://www.npmjs.com/package/react-native-responsive-fontsize)

Other tools:

* [Firebase](https://firebase.google.com/) will be the server where the data will be stored as a JSON, it will work as our database and it is the one that the app will access in order to fetch the bar data

* [Expo](https://expo.io/) will be our iOS and Android emulator

## **Objectives** ##
The mobile app will be our main product since it is going to be the only interaction available for the final user. The main objective of the app is to bring reliable and significant information as fast as possible, that's why we are prioritizing the use of multithreading wherever the system can support it. 

Analyzing the functionality of the app we can find that the computations done are minimal and there is no multithreading in there. The idea is to have a light app that don't make the mobile work that much but make the server work hard since we can control the power of the server but not the power of the phone that the user can have. Making the main work in the server will let any user with any kind of phone to enjoy our app.

The app is the final reason of all the work behind, to provide an app with the best apps of your area to enjoy some drinks with your friends as fast and easier as possible.

## **Implementation** ##
The app consists in 3 different interaction spaces: search page, list of bars page and the bar details page. 

![search.jpg](https://bitbucket.org/repo/ypnxBXX/images/2781134180-search.jpg) 

**SEARCH**

The search page is the first interaction space seen by the user. It consists in an autocomplete search bar that uses the google maps API to search for any location in the world and return the coordinates, the user then press apply and will have several filters that can be applied. Each bar will have a style or ambient, so the user can select them to find the bar that best fit them. Also, the user can order the bars depending on beer price, rating or crowd level and finally, each bar can provide different services like billiards, darts or table football and the user can select them in order to find the bars that provide those services. 

![Webp.net-resizeimage.jpg](https://bitbucket.org/repo/ypnxBXX/images/746489289-Webp.net-resizeimage.jpg)

**LIST OF BARS**

After the users apply the filters, a request is made to the server that will be the one in charge of displaying the bars desired by the user in the correct order. The bar information here consists in an image, name, rating and neighborhood. Also the style, services provided and beer price is shown. Finally, a beer appears more or less full depending on the prediction of how crowded the bar is going to be in the next hours.

The list will display the first bars and will only load new ones when the user scrolls down to prevent use of mobile power if not needed.

![det.jpg](https://bitbucket.org/repo/ypnxBXX/images/4058199497-det.jpg)

**BAR DETAILS**

When the list of bars is displayed, the user can select a bar pressing on it and this page will be shown with all the previous information already shown in the bar list but now displaying other common beverages prices as CocaCola or Coffee, a more clear text informing how crowded a bar is and a functional map with a marker indicating the location of the bar and the possibility to click on it and display the full address.

## **Extra information** ##
**The app is fully responsive and available for Android and iOS. **

**Android:** It can be downloaded through the use of the App Launcher [Expo](https://expo.io/) available in the app store. Then, in the explore page there is a search bar where you can search for: **@carlosbertomeu/barup** and the app will be available.

**iOS:** It can be downloaded through the use of the App Launcher [Expo](https://expo.io/) available in the app store. Then, you have to login. user: barupTest pass: baruppass and you will have access to the app.

**Fav stars:** part of the GUI are some stars that are no functional. Those are some elements prepared for the users to be able to log in, rate and comment bars and also save them as favorite bars, that's why there are a star next to the bars.

**GitHub:** the app was developed by Carlos Bertomeu and Sergi Olives and since it was a high load of work, another repository was used for easy access and to avoid problems with the other development groups.
The repository is available [https://github.com/CarlosBM99/barup/wiki](https://github.com/CarlosBM99/barup/wiki). It is only available via previous request, please send an email to **sergi.olives01@estudiant.upf.edu** to have access to this repository.
