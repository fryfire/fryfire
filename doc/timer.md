Timer
====

The `Timer` class is passed to the update methods of the game and scene nodes and can be used to retrieve the current app and game time and the time difference between the current and previous call to the update method.

All times are measured in seconds.

Application time
----------------

```typescript
const secondsSinceAppStart = time.getAppTime();
const secondsSinceLastUpdate = time.getAppDelta();
```

The application time is the time which has passed since application start. This time is constantly increased, is not affected by the game speed multiplier and cannot be paused. Use this time and especially the delta time for animating UI elements like scene transitions.

Game time
---------

```typescript
const secondsSinceAppStart = time.getGameTime();
const secondsSinceLastUpdate = time.getGameDelta();
const isPaused = time.isPaused();
const gameSpeed = time.getSpeed();
time.pause();
time.resume();
time.setSpeed(2);
```

The game time is equivalent to the application time but it is affected by the game speed multiplier and can be paused/resumed at any time. Use this time and especially the delta time for updating the game state.
