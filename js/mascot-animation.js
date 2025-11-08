// Mascot Animation System
document.addEventListener('DOMContentLoaded', function() {
    const mascotImage = document.getElementById('mascotImage');
    
    if (!mascotImage) return;
    
    // Array of mascot frames
    const mascotFrames = [
        'public/mascot_animated_frame1.png',
        'public/mascot_animated_frame2.png',
        'public/mascot_animated_frame3.png'
    ];
    
    let currentFrame = 0;
    const frameInterval = 800; // Change frame every 2 seconds
    
    // Function to change mascot frame
    function changeMascotFrame() {
        mascotImage.style.opacity = '0.8';
        
        setTimeout(() => {
            mascotImage.src = mascotFrames[currentFrame];
            mascotImage.style.opacity = '1';
            currentFrame = (currentFrame + 1) % mascotFrames.length;
        }, 100);
    }
    
    // Start animation loop
    setInterval(changeMascotFrame, frameInterval);
    
    // Add hover effect for interactivity
    mascotImage.addEventListener('mouseenter', function() {
        this.style.animation = 'mascot-bounce 0.6s ease-in-out infinite';
        this.style.filter = 'drop-shadow(0 10px 40px rgba(0, 242, 254, 0.6))';
    });
    
    mascotImage.addEventListener('mouseleave', function() {
        this.style.animation = 'mascot-bounce 2s ease-in-out infinite';
        this.style.filter = 'drop-shadow(0 10px 30px rgba(0, 242, 254, 0.3))';
    });
    
    // Add click effect
    mascotImage.addEventListener('click', function() {
        this.style.transform = 'scale(1.1) rotate(5deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1) rotate(0deg)';
        }, 300);
    });
});
