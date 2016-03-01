以video.js為例:

1. 複製video.js的URL: https://github.com/arphen/arphen.user.js/blob/master/libs/video.js
2. 打開 http://rawgit.com/，貼上上述URL，會顯示二個URL:
   * Use this URL for dev/testing: https://rawgit.com/arphen/arphen.user.js/master/libs/video.js
   * Use this URL in production: https://cdn.rawgit.com/arphen/arphen.user.js/master/libs/video.js
3. 引用差別：
   * dev/testing: 在GitHub更新後，約1分鐘即會同步更新。用量太大會被封鎖。
   * production: 在GitHub更新後，不確定多久會同步更新。無用量限制。
