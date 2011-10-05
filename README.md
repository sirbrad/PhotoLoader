<h1>PhotoLoader</h1>
<h2>What does it do?</h2>
<p>It displays a larger version of the thumbnail image our user has clicked.</p>
<h2>How?</h2>
<p>It's relatively simple, it's all to do with folder structre. Inside the main 'Image' folder you will find a sub folder called 'Thumbs'. When our beautiful users click on a thumbnail our script grabs the src of the image and splits it by passing our 'Thumbs' subfolder as a separator which leaves us with a clean path to the large image :D</p>
<p>We then grab Mr Big Image's src and say you now equal our split path that we just created.</p>
<h2>How does the fade happen</h2>
<p>I <strong>strongly</strong> believe in progressive enhancement so I used css3 transitions to the fade for modern browsers and offered a jQuery fallback. The css works on class names which are fairly easy to understand.</p>