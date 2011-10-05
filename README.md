<h1>PhotoLoader</h1>
<h2>What does it do?</h2>
<p>It displays a larger version of the thumbnail image our user has clicked.</p>
<h2>How?</h2>
<p>It's relatively simple, it's all to do with folder structure. Inside the main 'Image' folder you will find a sub folder called 'Thumbs' <code>Images/Thumbs/Img.jpg</code>. When our beautiful users click on a thumbnail our script grabs the src of the image and split it by passing our 'Thumbs' subfolder as a separator <code>src.split('Thumbs/')</code>. This leaves us a path to the larger version.</p>
<p>We then grab Mr Big Image's src and say you now equal the split path that we just created.</p>
<h2>How does the fade happen</h2>
<p>I <strong>strongly</strong> believe in progressive enhancement so I used css3 transitions to handle the fade for modern browsers and offered a jQuery fallback for older ones.</p>
<p>The css3 works via class names being set on the parentElem once each transition has successfully finished. You will see the interval running that is constantly checking to see if our image has opacity to 0.</p>
<h2>Demo</h2>
<p>Due to the script relying on our folder structure I couldn't set up a fiddle to demonstate, but I have a working version at <a href="http://alanfewcompany.co.uk/dev/projects-southend.php">alanfewcompany.co.uk/dev/projects-southend.php</a>.</p>