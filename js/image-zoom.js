var imgZoomTool = {
    zoomWindowResize: function() {
        var zoomedImg = document.getElementById('zoomedImg');
        var maxHeight = window.innerHeight - 20;
        var maxWidth = window.innerWidth - 20;
        zoomedImg.setAttribute('style', 'margin: 20px; max-height: ' + maxHeight + 'px; max-width: ' + maxWidth + 'px;');
    },
    zoomImageClick: function() {
        if (event.button == 0) {
            var img = event.target;
            var imgSrc = img.getAttribute('src');

            var zoomedImg = document.getElementById('zoomedImg');
            var imgBackground = document.getElementById('imgBackground');
            zoomedImg.setAttribute('src', imgSrc);
            imgBackground.style.visibility = 'visible';
            imgZoomTool.zoomWindowResize();

            window.addEventListener('resize', imgZoomTool.zoomWindowResize);
        }
    },
    zoomCloseClick: function() {
        if (event.button == 0) {
            var zoomedImg = document.getElementById('zoomedImg');
            var imgBackground = document.getElementById('imgBackground');
            zoomedImg.setAttribute('src', '');
            imgBackground.style.visibility = 'hidden';

            window.removeEventListener('resize', imgZoomTool.zoomWindowResize);
        }
    },
    initAt: function(divId) {
        // setup
        var gettedBody = document.getElementsByTagName('body');
        var imgBackground = document.createElement('div');
        imgBackground.onmousedown = imgZoomTool.zoomCloseClick;
        imgBackground.id = 'imgBackground';
        imgBackground.setAttribute('style', 'display: table; visibility: hidden; background-color: rgba(255, 255, 255, 0.8); position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 1000;');

            var spanPayload = document.createElement('span');
            spanPayload.setAttribute('style', 'display: table-cell; vertical-align: middle; text-align: center;');

                var zoomedImg = document.createElement('img');
                zoomedImg.setAttribute('style', 'margin: 20px;');
                zoomedImg.id = 'zoomedImg'
            
            spanPayload.appendChild(zoomedImg);

        imgBackground.appendChild(spanPayload);

        gettedBody[0].appendChild(imgBackground);

        // setup to target img children
        var postDiv = document.getElementById(divId);
        var imgs = postDiv.getElementsByTagName('img');
        var style = null;
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].onmousedown = imgZoomTool.zoomImageClick;
            style = imgs[i].getAttribute('style');
            if (style == null || style.search('cursor: pointer;') == -1) {
                if (style == null) style = 'cursor: pointer;';
                else style += 'cursor: pointer;';
                imgs[i].setAttribute('style', style);
            }
        }
    }
}
