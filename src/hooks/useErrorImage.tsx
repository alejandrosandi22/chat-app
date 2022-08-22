export default function useErrorImage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageOnError = (e: any) => {
    e.target.src = 'static/images/user.png';
  };

  return { imageOnError };
}
