# jQuery Touch Circle
Display indicators for touch events.

## Usage ##
    <html>
      <head>
        <title>TouchCircle Test</title>
      </head>
      <body>
        ...
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.2.3/jquery.min.js"></script>
        <script src="jquery.touchcircle.js"></script>
        <script type="text/javascript">
          $(function() { $("body").touchCircle() } )
        </script>
      </body>
    </html>

## Options ##
    $("body").touchCircle({
      enabled: true, // if false, will disable everything
      radius: 50, // size of the touch circle
      createTouchDiv: function(me) { // create your own custom touch div
        var touchPointDiv = $("<div class='touchcircle_point'></div");
        touchPointDiv.css("width",me.settings.radius*2);
        touchPointDiv.css("height",me.settings.radius*2);
        touchPointDiv.css("border","4px solid black");
        touchPointDiv.css("background","#999");
        touchPointDiv.css("opacity","0.5");
        touchPointDiv.css("border-radius","50%");
        // note that the system will set position:absolute
        return touchPointDiv;
      }
    })
