/*
Copyright 2021 The Extra Keyboards for Chrome OS Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

var contextID = 0;

var lut = {
  "KeyQ": [ "n", "N" ],
  "KeyW": [ "e", "E" ],
  "KeyE": [ "v", "V"],
  "KeyR": [ "e", "E" ],
  "KeyT": [ "r", "R" ],
  "KeyY": [ "g", "G" ],
  "KeyU": [ "o", "O" ],
  "KeyI": [ "n", "N" ],
  "KeyO": [ "n", "N" ],
  "KeyP": [ "a", "A" ],
  "KeyA": [ "g", "G" ],
  "KeyS": [ "i", "I" ],
  "KeyD": [ "v", "V" ],
  "KeyF": [ "e", "E" ],
  "KeyG": [ "y", "Y" ],
  "KeyH": [ "o", "O" ],
  "KeyJ": [ "u", "U" ],
  "KeyK": [ "u", "U" ],
  "KeyL": [ "p", "P" ],
  "KeyZ": [ "t", "T" ],
  "KeyX": [ "w", "W" ],
  "KeyC": [ "l", "L" ],
  "KeyV": [ "q", "Q" ],
  "KeyB": [ "x", "X" ],
  "KeyN": [ "s", "S" ],
  "KeyM": [ "z", "Z" ],
};
    

chrome.input.ime.onFocus.addListener(
    function(context) {
      contextID = context.contextID;
    }
);

chrome.input.ime.onBlur.addListener(() => {
  contextID = 0;
})


chrome.input.ime.onKeyEvent.addListener(
    function(engineID, keyData) {
      var handled = false;
      
      if (keyData.type == "keydown") {
        if (lut[keyData.code]) {
          let shifted = keyData.capsLock != keyData.shiftKey;
          let emit = lut[keyData.code][shifted];

          if (emit != null && contextID != 0) {
            chrome.input.ime.commitText({
              "contextID": contextID,
              "text": emit,
            }, () => {
              if (chrome.runtime.lastError) {
                console.error('Error committing text:', chrome.runtime.lastError);
                return;
              }
            });
          }
          handled = true;
        }
      }
      return handled;
});

