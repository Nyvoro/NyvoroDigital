export type Msg = {
  id: string;
  role: 'user' | 'bot' | 'system' | 'error';
  content: string;
};

export interface ConvState {
  messages: Msg[];
  pending: Record<string, boolean>;
}
