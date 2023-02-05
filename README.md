# js-vectors

A lightweight library for vector data structures: Vector2, Vector3 and Vector4.

## Features

|                                      |      `Vector2`      |       `Vector3`        |         `Vector4`         |
| :----------------------------------- | :-----------------: | :--------------------: | :-----------------------: |
| constructor                          | `new Vector2(x, y)` | `new Vector3(x, y, z)` | `new Vector4(x, y, z, w)` |
| constant `ZERO`                      |          ✓          |           ✓            |             ✓             |
| constant `ONE`                       |          ✓          |           ✓            |             ✓             |
| constant `UNIT_X`                    |          ✓          |           ✓            |             ✓             |
| constant `UNIT_Y`                    |          ✓          |           ✓            |             ✓             |
| constant `UNIT_Z`                    |          ✕          |           ✓            |             ✓             |
| constant `UNIT_W`                    |          ✕          |           ✕            |             ✓             |
| static `fromArray`                   |          ✓          |           ✓            |             ✓             |
| `toArray`                            |          ✓          |           ✓            |             ✓             |
| `set`                                |          ✓          |           ✓            |             ✓             |
| `setComponent`                       |          ✓          |           ✓            |             ✓             |
| `getComponent`                       |          ✓          |           ✓            |             ✓             |
| `clone`                              |          ✓          |           ✓            |             ✓             |
| `copy`                               |          ✓          |           ✓            |             ✓             |
| `eq`                                 |          ✓          |           ✓            |             ✓             |
| `ne`                                 |          ✓          |           ✓            |             ✓             |
| static `add` & `add`                 |          ✓          |           ✓            |             ✓             |
| static `addScalar` & `addScalar`     |          ✓          |           ✓            |             ✓             |
| static `sub` & `sub`                 |          ✓          |           ✓            |             ✓             |
| static `subScalar` & `subScalar`     |          ✓          |           ✓            |             ✓             |
| static `mul` & `mul`                 |          ✓          |           ✓            |             ✓             |
| static `mulScalar` & `mulScalar`     |          ✓          |           ✓            |             ✓             |
| static `div` & `div`                 |          ✓          |           ✓            |             ✓             |
| static `divScalar` & `divScalar`     |          ✓          |           ✓            |             ✓             |
| static `max` & `max`                 |          ✓          |           ✓            |             ✓             |
| static `min` & `min`                 |          ✓          |           ✓            |             ✓             |
| static `clamp` & `clamp`             |          ✓          |           ✓            |             ✓             |
| static `clampScalar` & `clampScalar` |          ✓          |           ✓            |             ✓             |
| static `floor` & `floor`             |          ✓          |           ✓            |             ✓             |
| static `ceil` & `ceil`               |          ✓          |           ✓            |             ✓             |
| static `round` & `round`             |          ✓          |           ✓            |             ✓             |
| static `roundToZero` & `roundToZero` |          ✓          |           ✓            |             ✓             |
| static `neg` & `neg`                 |          ✓          |           ✓            |             ✓             |
| static `dot`                         |          ✓          |           ✓            |             ✓             |
| static `cross`                       |          ✓          |           ✓            |             ✕             |
| `cross`                              |          ✕          |           ✓            |             ✕             |
| `length`                             |          ✓          |           ✓            |             ✓             |
| `lengthSq`                           |          ✓          |           ✓            |             ✓             |
| static `normalize` & `normalize`     |          ✓          |           ✓            |             ✓             |
| static `abs` & `abs`                 |          ✓          |           ✓            |             ✓             |
| static `distance`                    |          ✓          |           ✓            |             ✓             |
| static `distanceSq`                  |          ✓          |           ✓            |             ✓             |
| static `lerp` & `lerp`               |          ✓          |           ✓            |             ✓             |
| static `sqrt` & `sqrt`               |          ✓          |           ✓            |             ✓             |
| static `reflect`                     |          ✓          |           ✓            |             ✕             |
