const h_ads=document.querySelectorAll('.horizontal-ads');
for(let ad of h_ads){
    ad.innerHTML=`
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- color-tile-horizontal-ads -->
    <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-8598751574376549"
        data-ad-slot="5996761391"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
    `
}
const v_ads=document.querySelectorAll('.vertical-ads');
for(let ad of v_ads){
    ad.innerHTML=`
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <!-- color-tile-ads -->
    <ins class="adsbygoogle"
        style="display:block"
        data-ad-client="ca-pub-8598751574376549"
        data-ad-slot="6993669367"
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
    `
}

