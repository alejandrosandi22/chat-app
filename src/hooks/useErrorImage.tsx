export default function useErrorImage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const imageOnError = (e: any) => {
    console.log('error');
    e.target.src = 'static/images/user.png';
  };

  return { imageOnError };
}
