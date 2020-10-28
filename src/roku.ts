/**
This particular file under 0BSD License (per https://github.com/pranav-prakash/RokuCast)
Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted.
THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE
INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE
FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/
export function openApp(msg) {
  // tslint:disable-next-line: no-console
  console.dir(msg);
  if (localStorage.ipAddress !== undefined) {
    chrome.tabs.query(
      { active: true, windowType: "normal", currentWindow: true },
      (tabs) => {
        const ip = localStorage.ipAddress;
        const title = msg.title;
        const favIconURL = tabs[0].favIconUrl;
        // tslint:disable-next-line: no-console
        console.log(tabs);
        // tslint:disable-next-line: no-console
        console.log(title);
        // tslint:disable-next-line: no-console
        console.log(favIconURL);

        let isHLS = msg.sentLink.indexOf("m3u") !== -1;
        const isPlexStream =
          msg.sentLink.indexOf("&mediaIndex=0&partIndex=0&protocol=http") !==
          -1;

        if (isPlexStream) {
          msg.sentLink.replace(
            new RegExp("&mediaIndex=0&partIndex=0&protocol=http", "g"),
            "&mediaIndex=0&partIndex=0&protocol=hls",
          );
          isHLS = true;
        }

        const xhr = new XMLHttpRequest();
        xhr.open("HEAD", msg.sentLink, true);
        xhr.onload = () => {
          const url =
            "http://" +
            ip +
            ":8060/input/15985?t=v" +
            "&u=" +
            encodeURIComponent(xhr.responseURL) +
            "&videoName=" +
            encodeURIComponent(title) +
            "&videoFormat=" +
            (isHLS ? "hls" : "mp4");
          const method = "POST";
          const postData = "";
          const async = true;

          const request = new XMLHttpRequest();
          request.open(method, url, async);
          request.setRequestHeader(
            "Content-Type",
            "application/json;charset=UTF-8",
          );
          request.send(postData);
        };
        xhr.send(null);
      },
    );
  } else {
    alert("Please set your roku ip in options page");
  }
}
