import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  StatusBar,
  FlatList, // FlatList를 새로 import 합니다.
} from 'react-native';

function App() {
  const [name, setName] = useState('');
  const [verifiedUser, setVerifiedUser] = useState<{name: string; dept: string} | null>(null);
  const [scannedAssets, setScannedAssets] = useState<string[]>([]);

  const handleSearch = () => {
    if (!name.trim()) {
      Alert.alert('오류', '성함을 입력해주세요.');
      return;
    }
    if (name === '홍길동') {
      setVerifiedUser({name: '홍길동', dept: '전산팀'});
    } else {
      Alert.alert('검색 실패', '등록되지 않은 사용자입니다.\n관리자에게 문의 부탁드립니다.');
      setVerifiedUser(null);
    }
  };

  const handleScan = () => {
    if (scannedAssets.length >= 6) {
      Alert.alert('알림', '자산은 최대 6개까지 등록할 수 있습니다.');
      return;
    }
    const newAsset = `자산-${scannedAssets.length + 1}`;
    setScannedAssets([...scannedAssets, newAsset]);
  };
  
  const handleSave = () => {
    Alert.alert(
      '저장 확인',
      '변경하시겠습니까?',
      [
        { text: '아니오', style: 'cancel' },
        { text: '예', onPress: () => {
          console.log('저장할 사용자:', verifiedUser?.name);
          console.log('저장할 자산:', scannedAssets);
          Alert.alert('성공', '자산이 성공적으로 등록되었습니다.');
          setName('');
          setVerifiedUser(null);
          setScannedAssets([]);
        }},
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <Text style={styles.title}>자산 관리 시스템</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="성함을 입력하세요"
          value={name}
          onChangeText={setName}
          editable={!verifiedUser}
        />
        <TouchableOpacity
          style={[styles.button, verifiedUser ? styles.buttonDisabled : {}]}
          onPress={handleSearch}
          disabled={!!verifiedUser}>
          <Text style={styles.buttonText}>검색</Text>
        </TouchableOpacity>
      </View>

      {verifiedUser && (
        <>
          <View style={styles.userInfoContainer}>
            <Text style={styles.userInfoText}>
              {`성함: ${verifiedUser.name} | 부서: ${verifiedUser.dept}`}
            </Text>
          </View>
          
          <FlatList
            style={styles.list}
            data={scannedAssets}
            renderItem={({item}) => <Text style={styles.listItem}>{item}</Text>}
            keyExtractor={(item) => item}
            ListEmptyComponent={<Text style={styles.emptyListText}>스캔된 자산이 없습니다.</Text>}
          />

          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={handleScan}>
              <Text style={styles.buttonText}>스캔</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.actionButton,
                scannedAssets.length === 0 ? styles.buttonDisabled : {},
              ]}
              onPress={handleSave}
              disabled={scannedAssets.length === 0}>
              <Text style={styles.buttonText}>저장</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#333' },
  inputContainer: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, height: 50, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, paddingHorizontal: 15, fontSize: 16, backgroundColor: '#fff' },
  button: { width: 80, height: 50, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginLeft: 10 },
  buttonDisabled: { backgroundColor: '#a9a9a9' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  userInfoContainer: { padding: 15, backgroundColor: '#e0e0e0', borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  userInfoText: { fontSize: 18, fontWeight: '600', color: '#333' },
  list: { flex: 1, marginTop: 10, },
  listItem: { backgroundColor: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#eee', marginBottom: 10, fontSize: 16, },
  emptyListText: { textAlign: 'center', marginTop: 20, color: '#888', fontSize: 16, },
  actionContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, },
  actionButton: { flex: 1, height: 50, backgroundColor: '#34C759', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginHorizontal: 5, },
});

export default App;