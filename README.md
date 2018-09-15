# Openscreen

## About

Openscreen is a website that allows users to customize their icon arrangement by inserting dummy apps with invisible titles and camoflauging app icons.

### What is camoflauge?

A camoflauging app icon is the exact same as the wallpaper, so it looks like blank space when it's perfectly overlaid on top of the wallpaper.

To create such an app icon, you have to know its pixel-wise position on the phone screen, as well as its dimensions, and you must also know what the wallpaper looks like (i.e. have it as an image). 

Then you can just crop the wallpaper with the correct crop to get the desired app icon.

### How do you use openscreen?

This is work in progress, but users will interact with the finished product as follows:

1. Go to openscreen.me
2. Upload a screenshot of your iphone wallpaper.
3. Take the screenshot by sliding all your apps off screen, then pressing home & power at the same time.
4. The page will redirect to openscreen.me/ABCD/1
5. The page will show you a picture of what your phone would look like, as a grid of app icons (overlaid on top of your actual wallpaper)
6. The current app icon (icon `i`) will be highlighted in some way, so you know which one you're adding. Tapping other ones (e.g. icon `j`) will redirect to `/ABCD/{j}`, and cause it to be lit up.
7. **You have to manually do this step!** Use Safari (iOS) to add the current page to your home screen. *NOT A BOOKMARK*. It should show up with the correct app icon.
8. Click next (it'll redirect from `/ABCD/{i}` to `/ABCD/{i+1}`)
9. Repeat Step 7.
