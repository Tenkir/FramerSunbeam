import { useContext, MutableRefObject } from "react"
import { useFocusable as useFocusableSunbeam } from "react-sunbeam"
import { useOnFocus } from "./useOnFocus"
import { ScrollContextValue } from "./ScrollContext"

type Element = MutableRefObject<{
    getBoundingClientRect(): ClientRect
}>

export function useFocusable(
    focusKey: string,
    ref: Element
): { focused: boolean; path: string[] } {
    const focusableData = useFocusableSunbeam(focusKey, ref)

    // implement the logic necessary for Scroll component to be aware
    const scrollContextValue = useContext<ScrollContextValue>(
        (window as any).SunbeamScrollContext
    )
    const notifyScrollOnFocus = scrollContextValue
        ? scrollContextValue.notifyScrollOnFocus
        : null
    useOnFocus(focusableData.focused, () => {
        if (notifyScrollOnFocus)
            notifyScrollOnFocus({
                boundingBox: ref.current.getBoundingClientRect(),
            })
    })

    return focusableData
}
