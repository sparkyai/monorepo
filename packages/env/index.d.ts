export declare function env(key: string, _default?: string): string;

declare namespace env {
  function number(key: string, _default?: number): number;

  function boolean(key: string, _default?: boolean): boolean;
}
