function separator() {

  console.log("\n==============================");

}

export const logger = {

  separator,

  title(text) {

    separator();

    console.log(text);

    separator();

  },

  success(text) {

    console.log(`✅ ${text}`);

  },

  warning(text) {

    console.log(`⚠ ${text}`);

  },

  info(text) {

    console.log(`ℹ ${text}`);

  },

  update(text) {

    console.log(`🔄 ${text}`);

  },

  create(text) {

    console.log(`➕ ${text}`);

  },

  remove(text) {

    console.log(`🗑 ${text}`);

  },

  done(text) {

    console.log(`🏁 ${text}`);

  },

  error(text) {

    console.error(`❌ ${text}`);

  },

};