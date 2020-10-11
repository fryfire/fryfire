Game
====

The `Game` class is the main entry point of a game using Fryfire. It is an abstract class so you can't instantiate it directly. Instead you create your own game class extending it:

```typescript
import { Game } from "fryfire/lib/main/Game";

class MyGame extends Game {
}

new MyGame().start();
```

This little piece of code is already enough to start a game with a canvas which fills the whole screen and just renders a black background.

The game constructor supports some parameters to configure the game rendering. If your own game class has no constructor (which means it inherits the parent constructor) then you can pass these parameters when instantiating your game class:

```typescript
import { Size } from "fryfire/lib/main/geom/Size";

new MyGame({
    size: new Size(384, 216),
    pixelated: true,
    backgroundColor: "white";
}).start();
```

If you want to have your own constructor then you can either simply pass these parameters to the super constructor from your constructor or you can extend the `GameArgs` type to add more custom properties. This is concept used throughout the whole engine for scene nodes for example. So it is a good idea to get familiar with it:

```typescript
import { GameArgs } from "fryfire/lib/main/Game";

interface MyGameArgs extends GameArgs {
    someCustomData?: string;
    moreStuff?: number;
}

class MyGame extends Game {
    public constructor({ someCustomData, moreStuff, ...args }: MyGameArgs) {
        super(args);
        // Do something with your own properties.
    }
}

new MyGame({
    someCustomData: "foo",
    size: new Size(384, 216)
}).start();
```

Game parameters
---------------

* **size** - Optional physical game size. When set then the canvas uses this exact size and aspect ratio but is still scaled up (by CSS) to fill as much of the screen as possible. When not specified then the physical size is dynamically calculated from the window size and device pixel ratio.
* **pixelated** - Set this to true for a pixelated game. Image smoothing and image rendering is configured accordingly to this setting. Default is true when a fixed game size is specified, false if not.
* **backgroundColor** - The background color. Defaults to black. Before a frame is rendered the canvas is filled with this color.