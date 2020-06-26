/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import EasyDMCore from 'edmf-core';

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map((name) => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences:
      (process.env.NODE_ENV === 'development' ||
        process.env.E2E_BUILD === 'true') &&
      process.env.ERB_SECURE !== 'true'
        ? {
            nodeIntegration: true,
          }
        : {
            preload: path.join(__dirname, 'dist/renderer.prod.js'),
          },
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', createWindow);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// EasyDMCore.publicMethods.forEach((functionName: string) => {
//   exports[functionName] = (...args: Array<any>) => new Promise((resolve) => {
//     easyDMCore[functionName](...args).then((res: any) => resolve(res))
//   })
// })
// exports.TwitterAdapterApi = (functionName: string, params: Array<any>) => {
//   return new Promise((resolve: any) => {
//     easyDMCore.TwitterAdapter[functionName](...params)
//       .then((res: any) => resolve(res))
//   })
// }

// exports.setkeys = (
//   consumerKey: string,
//   consumerSecret: string,
//   acccessTokenKey: string, 
//   accessTokenSecret: string
// ) => {
//   return new Promise((resolve: any) => {
//     resolve(
      // easyDMCore.TwitterAdapter.setTwitterKeys({
      //   consumer_key: consumerKey,
      //   consumer_secret: consumerSecret,
      //   access_token_key: acccessTokenKey,
      //   access_token_secret: accessTokenSecret
      // })
//     )
//   })
// }

// exports.getUserObject = () => {
//   return new Promise((resolve: any) => {
//     easyDMCore.getUserObject()
//       .then((res: any) => resolve(res))
//   })
// }

// exports.setkeys = (...args: any) => {
//   return new Promise((resolve: any) => {
//     easyDMCore.setkeys(...args)
//       .then((res: any) => resolve(res))
//   })
// }

// const easyDMCore = new EasyDMCore("app/jupiter.sqlite");
// easyDMCore.getUserObject().then(value => console.log('========', value))

const easyDMCore = new EasyDMCore("app/jupiter.sqlite");

// ipcMain.on('user:getKeys', () => {
//   easyDMCore.getUserObject()
//     .then(res => {
//       console.log(res);
//       (mainWindow as any).webContents.send('user:getKeys', res);
//     })
//     .catch(err => {
//       (mainWindow as any).webContents.send('user:getKeys', err);
//     })
// })


// ipcMain.on('user:setKeys', (e,keys) => {
//   console.log(keys);
//   easyDMCore.setKeys(keys)
//     .then(res => {
//       console.log(res);
//       (mainWindow as any).webContents.send('user:setKeys', res);
//     })
//     .catch(err => {
//       (mainWindow as any).webContents.send('user:setKeys', err);
//     })
// })

// exports.getUsers = () => {
//   return new Promise((resolve: any) => {
//     easyDMCore.getUsersPaginated({})
//       .then((res: any) => resolve(res))
//   })
// }


const eventListenerGenerator = (path: string) => {
  ipcMain.on(path, (event: any, ...args: any[]) => {
    console.log("Arguments",path,args);
    easyDMCore[path](...args)
      .then(res => {
        console.log(res);
        (mainWindow as any).webContents.send(path, res);
      })
      .catch(err => {
        (mainWindow as any).webContents.send(path, err);
      })
  })
}

EasyDMCore.publicMethods.forEach(path => {
  eventListenerGenerator(path)
});

// ipcMain.on('getFollowers', () => {
//   easyDMCore.getFollowers()
//     .then(res => {
//       (mainWindow as any).webContents.send('getFollowers', res);
//     })
//     .catch(err => {
//       (mainWindow as any).webContents.send('getFollowers', err);
//     })
// })

// ipcMain.on('user:syncFollowers', () => {
//   easyDMCore.syncFollowers(true)
//     .then(res => {
//       console.log(res);
//       (mainWindow as any).webContents.send('user:syncFollowers', res);
//     })
//     .catch(err => {
//       (mainWindow as any).webContents.send('user:syncFollowers', err);
//     })
// })



