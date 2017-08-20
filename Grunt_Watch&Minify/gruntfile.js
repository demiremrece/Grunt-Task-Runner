module.exports = function(grunt) {
  //Proje ayarlarının ve tasklarının tanımlandığı yer
  grunt.initConfig({
    //package.json okunuyor
    pkg: grunt.file.readJSON('package.json'),

    //Minify taskının tanımlandığı yer. Farklı bir isim de verebilirsiniz. Ben pluginin ismini verdim.
    uglify: {
      options: {
          position: 'top',
          mangle:{
            // bu sayede fonksiyon/değişken isimlerine rastgele harfler atanıyor.
            toplevel:true
          },
          //minify ettiğimizde dosyanın başına bir yorum satırı ekliyor.
          //bugünün tarihini,projenin versiyonu gibi özellikleri ekleyebiliriz. Tamamen size kalmış.
          //<%= .. %> arasında değişkenlerimizi kullabiliriz. Sonuçta javascript yazıyoruz.
          banner: '/*! <%= pkg.description %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        // minify edeceğimiz dosyanın pathi
        src: 'src/main.js',
        // minify edilmiş dosyanın pathi
        dest: 'dest/main.min.js'
      }
    },

    watch: {
        options: {
            spawn: false,
            debounceDelay: 250
        },
        scripts: {
            //src klasörü altındaki tüm js dosyalarını takip ettirebiliriz.
            files: ['src/*.js'],
            tasks: ['uglify']
        },
        grunt: {
            files: ['gruntfile.js']
        }
    }

  });
  // uglify pluginini yüklüyoruz.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('watcher', 'javascript dosyalarını değişiklik için izler.', ['watch']);
}
