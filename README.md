# Object Detection Process
#### Concept taken from tfjs-examples-sentiment. Setup dynamic code base to make work end to end.

#Run Application
API
  Important packages:
    - Hapi 16.6.2
    - tensorflow 2.7.0
    - tensorflow converter 2.7.0
      - Mac: install Xcoder (converting to binary)
      - Window: visual studio installer (converting to binary)
      
  Build Script (Terminal):
    - cd object-detection-api
    - npm run start:server

UI
  Important packages:
    - Angular CLI
    - ngrx
    - Clarity Design System
  Build Script (Terminal)
    - cd object-detection-ui
    - npm run start:proxy
