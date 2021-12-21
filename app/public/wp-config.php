<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** MySQL database username */
define( 'DB_USER', 'root' );

/** MySQL database password */
define( 'DB_PASSWORD', 'root' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'xD9KCt9cI0u6L6QUFP3uKt9mZ1GuFkN29ck0pxmt+OFmPacOc3118d1nGKkccjq/lZhMMFgZaHbgAHhKcZBMSA==');
define('SECURE_AUTH_KEY',  '4HkMyJV2twfKrypk9lHyEKvDY255Fp4wc+pahueIShewy+iFG/a0R//aR0R1yQHFYHGUUlt1Iv4AVqe/Qm22og==');
define('LOGGED_IN_KEY',    'BC+QEVk3r7v3hLFMhYXIxmpqNuuYxVvL1nO215i7HG27PR/Kh9rQHxKU9u0hdvLj1Rhz6F3KBcSwhQSy81ugGg==');
define('NONCE_KEY',        '28vUeChtlCTdZ1s9POqcvpBabYxsjmaVN/oV+xmfMrpdXTnIUdAgf7aUDxwYhKJxLu5cMdQ9G9aWjlvfKFw1Lg==');
define('AUTH_SALT',        'kk7DwNCZNM+R1Xgcfq/5rDqKnYNB+M9h1A3zeDgwwLIAEFTxQbDBjFYJAHRcs6p0rbLpIZYzECKGtB71Fzlknw==');
define('SECURE_AUTH_SALT', 'f7TpRUO4Q/myGnz5NRWENS6MdMSbLqsigOkdfY/iluZNxV6kgLroKu6u89tyM4KaQFsJ6LeV0WkSmP6V7vA38Q==');
define('LOGGED_IN_SALT',   'DiXHN3T2PGiFNwTkG4qupftICWDNob7c76228KDiSh6hO4h9XlGMz00fYtPdx9S3Y2FuHCjKayfIXakx6ApyXg==');
define('NONCE_SALT',       'SZfScfqCSvooik40MpL0CH5NUNQ+SUSxfmk8/Je3l72PwPmI92i+VmBJVseMXXWxFHSb/KXBNiLH5fnWUZJL6g==');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';




/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
