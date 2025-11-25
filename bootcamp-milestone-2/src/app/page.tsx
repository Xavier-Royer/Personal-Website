import Image from "next/image";

export default function Home() {
  return (
	<>
        <main className="home-page">
         
          <h1 className="page-title">Xavier Royer</h1>

          <div className="about">
            <div className="about-img">
              <Image
                src="/ProfilePicture.png" 
                alt="A picture of Xavier Royer "
                className="circle-img"
                width={100}
                height={100}
              />
            </div>

            <div className="about-text">
              <p>
                Hi my name is Xavier Royer and I'm a physics major and Computer
                Science minor at Cal Poly! I love working on any STEM related
                projects. Other things I enjoy are reading literature, running,
                basketball, spikeball, learning new things, and pretty much
                anything outdoors!
              </p>
          
          </div>
          </div>
          
        </main>
	</>
  );
}

/*<head>
        <link rel="stylesheet" href="styles.css" />
        <title>Xavier's Website</title>
      </head>
      <body>
*/
