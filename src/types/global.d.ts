import type { Plugin } from 'vue'

declare global {
    type AnyFunction<T> = (...args: any[]) => T

    type Recordable<T = any> = Record<string, T>

    type CustomizedHTMLElement<T> = HTMLElement & T

    type Nullable<T> = T | null
    type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
    type SFCWithInstall<T> = T & Plugin

    declare type TimeoutHandle = ReturnType<typeof setTimeout>
    declare type IntervalHandle = ReturnType<typeof setInterval>
}
