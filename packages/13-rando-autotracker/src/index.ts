// https://github.com/TrevorLuckey/KH2Tracker/blob/2fa449fdd58b4c3a408484c6c33884cac443e992/KhTracker/AutoTracking/AutoTracker.cs#L108
// https://github.com/Rob--/memoryjs
// need python also

export * from './model';
export * from './memoryReader';
export * from './memoryUtil';

// Package this up separately and expose a rest api for it, then call the api in the electron app to get around webpack being poopy