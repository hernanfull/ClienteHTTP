/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

require("./bundle-config");
var application = require("application");
var platform = require("platform");

if (platform.isAndroid && platform.device.sdkVersion >= "21") {
  application.android.onActivityStarted = function() {
    var window = application.android.startActivity.getWindow();
    var decorView = window.getDecorView();
    decorView.setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
  }
}

application.start({ moduleName: "views/list/list" });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
