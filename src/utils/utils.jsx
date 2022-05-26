export const shortenedPublicKey = (publicKey) => {
  return publicKey?.length > 5 ? `${publicKey.substr(0, 4)}...${publicKey.substr(publicKey.length - 4)}` : "";
}