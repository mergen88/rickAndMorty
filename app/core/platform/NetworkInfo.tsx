import { Platform } from "react-native";
import NetInfo from '@react-native-community/netinfo';

abstract class NetworkInfo {
    abstract isConnected: () => Promise<boolean>
}

class NetworkInfoImpl implements NetworkInfo {
    isConnected = async (): Promise<boolean> => {
        
        return await NetInfo.fetch().then((state) => state.isConnected ) ?? false
    };
    
}

export const networkInfo = (): NetworkInfo => { 
    return new NetworkInfoImpl() 
}