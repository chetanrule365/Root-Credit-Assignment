export type LinksFunction = () => Array<
  | { rel: string; href: string; crossOrigin?: string }
  | { name: string; content: string }
>;

export type ErrorBoundaryProps = {
  error: unknown;
};
