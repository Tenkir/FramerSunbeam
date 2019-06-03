# Framer Sunbeam

Spatial navigation and focus management for TVs and gaming consoles done simple.
Uses [react-sunbeam 🌅](https://github.com/vovaguguiev/react-sunbeam) under the hood.

## Contact

You can report issues [here](https://github.com/vovaguguiev/FramerSunbeam/issues/new) and address questions about Framer Sunbeam to [@wzrdzl](https://twitter.com/wzrdzl) on Twitter

## Details

Provides three easy to use code components.

-   Drag them onto your canvas
-   Connect them to their content (`Frames` or any other code components)
-   Specify the child property to update on focus for every `Focusable`
-   Drop your `Focusable`s into the Sunbeam `Scroll` component if you need scrolling behaviour
-   Run the preview of the `Frame` containing `SunbeamContainer`
-   Press arrow keys on your keyboard/gamepad/tv remote
-   Enjoy spatial navigation magic happen

## Example Project

You can download the example Framer project that demonstrates how to setup Framer Sunbeam below. Unzip the archive and open the file in Framer X.

![Example project screenshot](https://user-images.githubusercontent.com/1524432/57556043-31c77080-7376-11e9-8afd-5c403954abbb.png)

[SunbeamExampleProject.zip](https://github.com/vovaguguiev/FramerSunbeam/files/3168065/SunbeamExampleProject.zip)

## Components

### `SunbeamContainer`

Creates a focus management context.

Connect it to the `Frame` within which you want focus to be managed
You can only have one `SunbeamContainer` per artboard

#### Props

##### **Up key** - `upKey?: string` - default `"ArrowUp"`

##### **Down key** - `downKey?: string` - default `"ArrowDown"`

##### **Left key** - `leftKey?: string` - default `"ArrowLeft"`

##### **Right key** - `rightKey?: string` - default `"ArrowRight"`

Allows to override the default spacial navigation keys.
See the full list of available key codes [here](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)

##### `onKeyPress?: (event: KeyboardEvent) => void`

Allows to invoke some function when a keyboard key is pressed. Can be provided via [code overrides](https://framer.gitbook.io/framer/code/code-overrides).

##### `onFocusUpdate?: (event: { focusPath: ReadonlyArray<string> }) => void`

Allows to invoke a function when the focus is updated. An event object containing the new `focusPath` is passed to this callback.
Can be provided via [code overrides](https://framer.gitbook.io/framer/code/code-overrides).

### `Focusable`

Defines a component that can receive focus.

Connect it to a content component (`Frame` or any other code/design component).
Most of the time you want the size of the `Focusable` to match the size of its child content because when calculating the best candidate for receiving focus Sunbeam uses position and dimensions of the `Focusable`, not its content

You can nest `Focusable`s, in this case the best candidate for the focus is first attempted to be found within the same `Focusable` parent.
This is useful when creating sections of the UI, e.g. Side Menu where the `Focusable` items are not necessarily positioned to each other closer than to the items from the Main section

#### Props

##### **Key** - `focusableKey?: string`

Set to a randomly generated string by default.
Identifier of a `Focusable`. Has to be unique among the `Focusable` siblings

##### **Tap to focus** - `tapToFocus?: boolean`

Set to false by default.
Specifies if the `Focusable` should receive focus when tapped/clicked

##### **Focus prop** - `focusProp?: string`

Name of the child prop that will be updated when `Focusable` receives/loses focus.
E.g. if you are wrapping a Frame you can find the list of the props available to you [here](https://www.framer.com/api/frame/)

##### **Focus prop type** - `focusPropType?: "string" | "boolean" | "number" | "color"`

Type of `focusProp`

##### **Focused value** - `focusedValueString?: string` or `focusedValueBoolean?: boolean` or `focusedValueNumber?: number` or `focusedValueColor?: string`

Value that is passed to the child's prop when the `Focusable` is focused

##### **Blurred value** - `blurredValueString?: string` or `blurredValueBoolean?: boolean` or `blurredValueNumber: number` or `blurredValueColor: string`

Value that is passed to the child's prop when the `Focusable` is blurred

##### `onFocus?: ({ element: HTMLElement; focusablePath: ReadonlyArray<string> }) => void`

Function that is called when the `Focusable` receives focus. Can be provided via [code overrides](https://framer.gitbook.io/framer/code/code-overrides). Receives `focusablePath` which is an array of `focusableKey`s of all `Focusable`s in the hierarchy from the root `Focusable` to the current one. Can be useful for saving the focus state or reacting to the focus updates, e.g. manual scrolling to the focused component

### `Scroll`

Mimics the behaviour of the Framer built-in `Scroll` component but it is aware
of the currently focused `Focusable` child and automatically scrolls it into view when needed.
This component is useful for creating scrollable carousels and grids of `Focusable` components

#### Props

##### **Overflow** - `overflow: boolean`

Specifies whether the content overflowing the `Scroll` viewport should be visible or not

##### **Direction** - `direction: "vertical" | "horizontal" | "both"`

The allowed direction of scrolling

## CHANGELOG

### v1.19.0

Add `onKeyPress` and `onFocusUpdate` props to `SunbeamContainer`

### v1.15.0

Proudly introducing the new component - `Scroll` 🎉.
It mimics the behaviour of the Framer built-in `Scroll` component but it is aware of the currently focused `Focusable`
and automatically scrolls it into view

### v1.14.0

BREAKING CHANGE: `onFocus` callback now accepts an object of type `{ element: HTMLElement; focusablePath: string[] }` as an argument, before it was a string `focusablePath`
