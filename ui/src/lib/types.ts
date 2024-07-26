export type Chain = {
  name: string;
  icon: string;
  tokens: Token[];
};

export type Token = {
  name: string;
  icon: string;
};

export type TokenBoxVariant = {
  type: "from" | "to";
};
